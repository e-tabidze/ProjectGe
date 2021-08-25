import http from "./httpService";

export function getJewels() {
  return http.get("/api/jewels/").then((res) => {
    return res.data;
  });
}

export function getSimilarJewels(type) {
  return http
    .post("/api/jewels/similar", { type: type })
    .then((res) => {
      console.log(res.data);
      return res.data;
    });
}

// export function getSuperJewels() {
//   return http.get("/api/jewels/super").then((res) => {
//     return res.data;
//   });
// }

// export function getVipJewels() {
//   return http.get("/api/jewels/vip").then((res) => {
//     return res.data;
//   });
// }

// export function getDefaultJewels() {
//   return http.get("/api/jewels/default").then((res) => {
//     return res.data;
//   });
// }

export function getJewel(id) {
  return http
    .put(`/api/jewels/jewel`, { id: id })
    .then((res) => {
      return res.data;
    });
}

export function getStones() {
  return http.get("/api/stones/").then((res) => {
    console.log(res, "<===== STONE DATA")
    return res.data;
  });
}

export function getMetals() {
  return http.get("/api/metals/").then((res) => {
    return res.data;
  });
}

export function getPieces() {
  return http.get("/api/pieces/").then((res) => {
    return res.data;
  });
}

// export function getTypes() {
//   return http.get("/api/types/").then((res) => {
//     return res.data;
//   });
// }

export function getUserJewels(userId) {
  return http.post("/api/users/jewels", { userId });
}

export function postJewels(newJewel, userToken) {
  return http
    .post("/api/jewels/add", newJewel, {
      headers: {
        "x-auth-token": userToken,
        action: "/multiple-upload",
        enctype: "multipart/form-data",
        "Content-type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    });
}

export async function editJewel(updatedJewel, jewelId, userToken) {
  return await http.post(`/api/jewels/update/${jewelId}`, updatedJewel, {
    headers: {
      "x-auth-token": userToken,
      action: "/multiple-upload",
      enctype: "multipart/form-data",
      "Content-type": "application/json",
    }
  })
  .then(async (res) => {
    return await res.data;
  })
}


export function deleteJewel(jewelId, userToken) {
  console.log(jewelId, userToken, "jewelId nd Usertoken");
  return http
    .delete(`/api/jewels/delete/${jewelId}`, {
      headers: {
        "x-auth-token": userToken,
      },
    })
    .then((res) => {
      return res.data;
    });
}

export function registerUser(user) {
  return http.post("/api/users", user).then((res) => {
    console.log(res.data, "<====== REGISTER")
    return res;
  });
}

export function login(email, password) {
  return http.post("/api/auth", { email, password });
}

export function forgotPassword(email) {
  return http
    .post("/api/password-reset", { email })
    .then((res) => {
      return res.data;
    });
}

export function changePassword(userId, userToken, password) {
  return http
    .post(`/api/password-reset/${userId}/${userToken}`, {
      password,
    })
    .then((res) => {
      return res.data;
    });
}
