import * as d from '@declarations';
import ts from 'typescript';
import { convertValueToLiteral, createStaticGetter } from '../transform-utils';


export function addWatchers(classMembers: ts.ClassElement[], cmp: d.ComponentCompilerMeta) {
  if (cmp.watchers.length > 0) {
    const watcherObj: d.ComponentConstructorWatchers = {};

    cmp.watchers.forEach(({propName, methodName}) => {
      watcherObj[propName] = watcherObj[propName] || [];
      watcherObj[propName].push(methodName);
    });
    classMembers.push(createStaticGetter('watchers', convertValueToLiteral(watcherObj)));
  }
}