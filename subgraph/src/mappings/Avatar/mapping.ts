import {
  SetName
} from "../../types/DAONetwork/Avatar";

import * as domain from "../../domain";

export function handleSetName(event: SetName): void {
  domain.handleSetName(event);
}
