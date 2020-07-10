import http from "../http-common";

class TaskDataService {
  get() {
    return http.get("/tasks");
  }
}

export default new TaskDataService();