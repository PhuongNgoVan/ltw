import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

function UserList() {
  const [users, setUsers] = useState([]);

 useEffect(() => {
  // Chỉ cần một lượt gọi duy nhất với đường dẫn tương đối (endpoint)
  fetchModel("/user/list")
    .then((response) => {
      // Hàm fetchModel mới đã tự động bọc dữ liệu vào { data: ... }
      if (response && response.data) {
        setUsers(response.data);
      }
    })
    .catch((error) => {
      console.error("Lỗi kết nối Backend:", error);
    });
}, []); // Đảm bảo mảng phụ thuộc rỗng để chỉ chạy 1 lần khi mount

  return (
    <div>
      <Typography variant="h6" sx={{ mb: 1, p: 2 }}>
        Users List
      </Typography>

      <List component="nav">
        {users.length > 0 ? (
          users.map((user) => (
            <React.Fragment key={user._id}>
              <ListItem disablePadding>
                <ListItemButton component={Link} to={`/users/${user._id}`}>
                  <ListItemText
                    primary={`${user.first_name} ${user.last_name}`}
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))
        ) : (
          <Typography variant="body2" sx={{ p: 2 }}>
            Đang tải dữ liệu hoặc lỗi kết nối...
          </Typography>
        )}
      </List>
    </div>
  );
}

export default UserList;