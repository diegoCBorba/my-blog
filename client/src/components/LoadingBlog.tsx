import { Box, Card, CardContent, Grid, Skeleton, Typography } from '@mui/material'

interface PropsLoadingBlog{
  numberBlogs: number,
}

export const LoadingBlog = ({ numberBlogs }: PropsLoadingBlog) => {
  return (
    <Grid container spacing={4}>
      {Array.from({ length: numberBlogs }).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <Skeleton variant="rectangular" height={140} />
            <CardContent>
              <Typography variant="h6">
                <Skeleton width="60%" />
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <Skeleton width="80%" />
              </Typography>
            </CardContent>
            <Box p={2}>
              <Skeleton width="40%" />
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
