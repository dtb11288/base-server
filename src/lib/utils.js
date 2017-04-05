// @flow
import { compose, chain } from 'ramda'
import Maybe from 'folktale/data/maybe'

export const chainMaybe = f => chain(compose(Maybe.fromNullable, f))
