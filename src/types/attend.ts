export type Attendances = {
  date: string
  isAttendance: boolean
}

export type Attendance = {
  data: { weekStart: string; weekEnd: string; attendances: Attendances[] }
}
