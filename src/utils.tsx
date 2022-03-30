import React from 'react';
import _find from 'lodash/find';
import _isEqual from 'lodash/isEqual';
import _isEmpty from 'lodash/isEmpty';
import _mapValues from 'lodash/mapValues';
import hash from 'hash-string';
import { pathToRegexp, match as pathMatch } from '@qixian.cs/path-to-regexp';

import { Mode } from './config';
import { RouteConfig, RenderRoute, SetTabNameFn } from './useSwitchTabs';
import { RoughLocation } from '.';

/** 判断给定 location 是否在 originalRoutes 中，可作为标签页展示 */
export function isSwitchTab(location: RoughLocation, originalRoutes: RouteConfig[]): boolean {
  function isInMenus(menuData: RouteConfig[]) {
    const targetMenuItem = _find(menuData, (item) => pathToRegexp(`${item.path}(.*)`).test(location.pathname));

    return !!targetMenuItem;
  }

  return isInMenus(originalRoutes);
}

const pathnameMapCache: {
  [k: string]: any;
} = {};

/**
 * 解析 `RenderRoute`，核心是算出合适的 `renderKey`
 *
 * @param location
 * @param originalRoutes 原始路由数据，未经过滤处理
 */
function getOriginalRenderRoute(location: RoughLocation, originalRoutes: RouteConfig[]): RenderRoute {
  const { pathname } = location;

  if (pathnameMapCache[pathname]) {
    return pathnameMapCache[pathname];
  }

  function getMetadata(menuData: RouteConfig[], parent: RouteConfig | null): RenderRoute {
    let result: any;

    /** 根据前缀匹配菜单项，因此，`BasicLayout` 下的 **一级路由** 只要配置了 `name` 属性，总能找到一个 `path` 和 `name` 的组合 */
    const targetRoute = _find(menuData, (item) => pathToRegexp(`${item.path}(.*)`).test(pathname) && !!item.name);

    /** 如果为 **一级路由** 直接写入 `result` ，否则父级没有 `component` 时才能写入 `result` */
    if ((!parent && targetRoute) || (parent && !parent.component && targetRoute)) {
      result = {
        renderKey: targetRoute.path!,
        ...targetRoute,
      };
    }
    /** 如果父级配置了 `hideChildrenInMenu` ，子级配置了 `name` 则重写 `result` */
    if (parent?.hideChildrenInMenu && targetRoute) {
      result = {
        renderKey: parent.path!,
        ...targetRoute,
      };
    }

    /** 递归设置 `renderKey` */
    if (Array.isArray(targetRoute?.children) && targetRoute?.children.length) {
      result = getMetadata(targetRoute!.children!, targetRoute!) || result;
    }
    if (Array.isArray(targetRoute?.routes) && targetRoute?.routes.length) {
      result = getMetadata(targetRoute!.routes!, targetRoute!) || result;
    }

    return result;
  }

  const result = getMetadata(originalRoutes, null);

  /** 在存在页面子路由，如果不赋值 pathname，path 始终指向父路由 */
  pathnameMapCache[pathname] = { ...result, path: pathname };
  return pathnameMapCache[pathname];
}

/**
 * 解析路由定义中参数
 *
 * 如： `path = /user/:id` ，`pathname = /user/48` ，可解析得到 `{ id: "48" }`
 *
 * @param path 路由定义
 * @param pathname 当前的页面路由
 */
export function getParams(path: string, pathname: string): { [key: string]: string } {
  const match = pathMatch(path);
  const result = match(pathname) as {
    index: number;
    params: { [k: string]: string };
    path: string;
  };
  return result.params;
}

/**
 * 获取要激活的标签页信息
 *
 * @param options 其中，`location` 必须是 `react-router` 注入的 `location`，否则部署到非根目录功能时功能异常
 * @returns
 */
export function getRenderRoute(options: {
  location: RoughLocation;
  mode: Mode;
  originalRoutes: RouteConfig[];
  setTabName?: SetTabNameFn;
}): RenderRoute {
  const { location, mode, originalRoutes, setTabName } = options;

  const renderRoute = getOriginalRenderRoute(location, originalRoutes);

  if (!renderRoute || mode === Mode.Route) {
    return renderRoute;
  }

  // 以下为 **路径** 模式的处理逻辑：
  // 核心是根据路由中所带的参数算出参数的哈希值，之后可将其与算出的 `renderKey` 拼成一个标签页的唯一 id
  // 这样，不同的参数就能得到不同的标签页了

  const params = getParams(renderRoute.renderKey, location.pathname!);
  const { search, state = {} } = location;

  let hashString = '';

  if (!_isEmpty(params) || !_isEmpty(search) || !_isEmpty(state)) {
    const hashObject = {
      ...params,
      /**
       * 如果在 router.push 的时候设置 query ，可能导致查询参数为 number 类型，在点击标签页标题的时候又会变为 string 类型
       * 导致了计算的 hash 值可能不唯一，故统一转换为 string 类型的 search 字段来处理，而不是使用 query 字段
       *
       * 又当前 React Router Dom 在 history.push() 的时候如果对象中存在 search 字段时，如果 search 首字母不是 ? 会被插入一个 ?
       * 故统一处理判断首字母是否为问号
       */
      search: search.charAt(0) === '?' ? search.slice(1) : search,
      ...(state as any),
    };
    hashString = hash(JSON.stringify(hashObject));
  }

  return {
    ...renderRoute,
    hash: hashString,
    name:
      setTabName?.({ path: renderRoute.path, name: renderRoute.name as string, params, location }) || renderRoute.name,
  };
}

export const routePagePropsAreEqual = (prevProps: any, nextProps: any) => {
  const {
    children: prevChildren,
    computedMatch: prevComputedMatch,
    history: prevHistory,
    location: prevLocation,
    match: prevMatch,
    route: prevRoute,
    staticContext: prevStaticContext,
    ...prevRest
  } = prevProps;
  const {
    children: nextChildren,
    computedMatch: nextComputedMatch,
    history: nextHistory,
    location: nextLocation,
    match: nextMatch,
    route: nextRoute,
    staticContext: nextStaticContext,
    ...nextRest
  } = nextProps;
  if (!_isEqual(prevRest, nextRest)) {
    console.log(`${prevLocation.pathname}: update by props`);
    // console.log(prevRest);
    // console.log(nextRest);
    return false;
  }

  const { pathname: prevPathname, search: prevSearch, state: prevState } = prevLocation || {};
  const { pathname: nextPathname, search: nextSearch, state: nextState } = nextLocation || {};
  const isLocationChange =
    prevPathname !== nextPathname || prevSearch !== nextSearch || !_isEqual(prevState, nextState);
  if (isLocationChange) {
    console.log(`${prevLocation.pathname} -> ${nextPathname}: update by route or params`);
    // console.log({ prevPathname, prevSearch, prevState });
    // console.log({ nextPathname, nextSearch, nextState });
    return false;
  }

  console.log(`without re-render: ${prevPathname}`);
  return true;
};

export function withSwitchTab<Props = unknown>(
  WrappedComponent: React.ComponentType<Props>
): React.MemoExoticComponent<any> {
  const WithRoutePage = React.memo((props: any) => {
    // useConsole(props.location.pathname);

    return <WrappedComponent {...props} />;
  }, routePagePropsAreEqual);

  WithRoutePage.displayName = `WithRoutePage(${getDisplayName(WrappedComponent)})`;

  return WithRoutePage;
}

function getDisplayName(WrappedComponent: React.ComponentType<any>) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function getRenderRouteKey(renderRoute: RenderRoute, mode: Mode) {
  if (mode === Mode.Dynamic && renderRoute?.hash) {
    return `${renderRoute.renderKey}-${renderRoute.hash}`;
  }
  return renderRoute.renderKey;
}
