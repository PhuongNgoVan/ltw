// lib/fetchModelData.js

// Tự động lấy URL từ môi trường, giúp bạn không phải sửa code khi đổi máy
const BASE_URL = "http://localhost:8081/api";

async function fetchModel(path) {
  try {
    // Nếu path truyền vào đã là URL tuyệt đối (có http) thì dùng luôn
    // Nếu không thì nối BASE_URL với path (ví dụ: /user/list)
    const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return { data: data };
  } catch (error) {
    console.error("Fetch Model Error:", error);
    throw error;
  }
}

export default fetchModel;