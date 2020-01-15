import React, {useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import './SexEmotion.css';
const AntSwitch = withStyles(theme => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

export default function CustomizedSwitches(props) {
  const [state, setState] = React.useState({
    checkedButton: true,
  });
  console.log(props, " this is inside sex emotion")

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };
  useEffect(() => {
    if (state.checkedButton === true) {
      props.setToggle("sex");
    } else {
      props.setToggle("emotions");
    }
  }, [state])
  return (
    <FormGroup className={'MuiFormGroup-root-sex'}>
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Emotions</Grid>
          <Grid item>
            <AntSwitch
              checked={state.checkedButton}
              onChange={handleChange('checkedButton')}
              value="checkedButton"
            />
          </Grid>
          <Grid item>Sex</Grid>
        </Grid>
      </Typography>
    </FormGroup>
  );
}
