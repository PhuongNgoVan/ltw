import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

// Giữ nguyên logic load ảnh từ local
function importAll(r) {
  const images = {};
  r.keys().forEach((item) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const imageMap = importAll(
  require.context("../../images", false, /\.(png|jpe?g|svg)$/)
);

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchModel(`/photo/photosOfUser/${userId}`)
      .then((response) => {
        if (response && response.data) {
          setPhotos(response.data);
        }
      })
      .catch((error) => console.error("Error fetching user photos:", error));
  }, [userId]);

  return (
    <Box className="user-photos-container">
      {photos.map((photo) => (
        <Card key={photo._id} sx={{ mb: 3 }}>
          <CardContent>
            {/* Hiển thị ảnh */}
            <Box
              component="img"
              src={imageMap[photo.file_name]}
              alt={photo.file_name}
              sx={{
                width: "100%",
                maxWidth: "600px",
                display: "block",
                mb: 2,
                borderRadius: "4px"
              }}
            />

            <Typography variant="body2" color="text.secondary" gutterBottom>
              Posted: {new Date(photo.date_time).toLocaleString()}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" sx={{ mb: 1 }}>
              Comments
            </Typography>

            {/* Hiển thị danh sách bình luận */}
            {photo.comments && photo.comments.length > 0 ? (
              photo.comments.map((comment, index) => (
                <Box key={comment._id} sx={{ mb: 2, pl: 1 }}>
                  <Typography variant="subtitle2">
                    <Link to={`/users/${comment.user._id}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                      {comment.user.first_name} {comment.user.last_name}
                    </Link>
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.secondary"
                      sx={{ ml: 1 }}
                    >
                      • {new Date(comment.date_time).toLocaleString()}
                    </Typography>
                  </Typography>

                  <Typography variant="body1" sx={{ mt: 0.5 }}>
                    {comment.comment}
                  </Typography>

                  {index < photo.comments.length - 1 && (
                    <Divider variant="inset" sx={{ mt: 2, ml: 0 }} />
                  )}
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                No comments yet.
              </Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default UserPhotos;