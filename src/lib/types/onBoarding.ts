

export type action = "create" | "import"


export interface OnBoardingTasksType {
  action : action;
  networkName : string;
  mneumonic : string;
  email : string;
  password : string
}
