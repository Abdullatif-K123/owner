import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';

type Props = IconButtonProps;

const PlayIconButton = ({ disabled, ...props }: Props) => {
  if (disabled) {
    return (
      <IconButton disabled={disabled} {...props}>
        <PlayCircleFilledWhiteIcon sx={{ color: 'primary' }} />
      </IconButton>
    );
  }
  return (
    <Tooltip title="انشاء رحلة">
      <IconButton {...props}>
        <PlayCircleFilledWhiteIcon sx={{ color: 'primary' }} />
      </IconButton>
    </Tooltip>
  );
};
export default PlayIconButton;
