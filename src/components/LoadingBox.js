import { CircularProgress } from '@mui/material'
import { Box } from '@mui/material'

export default function LoadingBox() {
  return (
    <Box>
      <CircularProgress color='secondary' />
    </Box>
  )
}
