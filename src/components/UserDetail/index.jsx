import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchModel(`/user/${userId}`)
      .then((response) => {
        if (response && response.data) {
          setUser(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching user detail:", error);
      });
  }, [userId]); // Chạy lại mỗi khi ID trên URL thay đổi

  if (!user) {
    return <Typography variant="body1">Loading user information...</Typography>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {user.first_name} {user.last_name}
        </Typography>

        <Typography variant="body1" gutterBottom>
          <strong>Location:</strong> {user.location}
        </Typography>

        <Typography variant="body1" gutterBottom>
          <strong>Occupation:</strong> {user.occupation}
        </Typography>

        <Typography variant="body1" gutterBottom>
          <strong>Description:</strong> {user.description}
        </Typography>

        <Button
          variant="contained"
          component={Link}
          to={`/photos/${user._id}`}
          sx={{ mt: 2 }}
        >
          View Photos
        </Button>
      </CardContent>
    </Card>
  );
}
export default UserDetail;