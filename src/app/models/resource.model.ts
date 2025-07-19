import { Owner } from "./owner.model";

export interface Resource {
  id: string;
  serviceId: string;
  owners: Owner[];
}