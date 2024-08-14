

export type action = "create" | "import"


export interface OnBoardingTasksType {
  action : action;
  networkName : string;
  mneumonic : string;
  password : string
}
