import http from "../http-common";

class TaskDataService {
  get() {
    return http.get("/tasks");
  }

  create(data) {
    return http.post("/tasks", data)
  }

  updatePriority(data) {
    return http.put("/priority", data)
  }
}

export default new TaskDataService();