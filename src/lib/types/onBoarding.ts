import { SelectedNetworkType } from "./wallettypes";


export type action = "create" | "import"


export interface OnBoardingTasksType {
  action : action;
  networkName : SelectedNetworkType;
  mneumonic : string;
  email : string;
  password : string
}
