import { Injectable } from '@angular/core';
import {
  EntityServiceBase,
  EntityServiceFactory,
  EntityMetadata
} from 'ngrx-data';
import { Hero } from '../core';
import { EntityDefinition } from '@ngrx/entity/src/models';
import { EntityCollection } from 'ngrx-data';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { EntitySelectors } from 'ngrx-data';
import { createEntitySelectors } from 'ngrx-data';

export function sortByName(a: { name: string }, b: { name: string }): number {
  return a.name.localeCompare(b.name);
}

export const adapter: EntityAdapter<Hero> = createEntityAdapter<Hero>({
  sortComparer: sortByName
});

export const meta: EntityMetadata<Hero> = {
  entityName: 'Hero'
};

export const selectors: EntitySelectors<Hero> = createEntitySelectors<
  Hero,
  EntitySelectors<Hero>
>(meta);

export const initialEntityCollectionState: EntityCollection = {
  filter: '',
  entities: {
    13: {
      id: 13,
      name: 'Muhammad Ali',
      saying: 'Float like a butterfly, sting like a bee.'
    },
    14: {
      id: 14,
      name: 'Eleanor Roosevelt',
      saying: 'No one can make you feel inferior without your consent.'
    }
  },
  loading: false,
  loaded: false,
  originalValues: {},
  ids: [13, 14]
};

@Injectable()
export class HeroService extends EntityServiceBase<Hero> {
  constructor(entityServiceFactory: EntityServiceFactory) {
    entityServiceFactory.entityDefinitionService.registerDefinition({
      entityName: 'Hero',
      selectId: (hero: Hero) => hero.id,
      entityAdapter: adapter,
      metadata: meta,
      selectors: selectors,
      initialState: initialEntityCollectionState
    });
    super('Hero', entityServiceFactory);
  }
}
