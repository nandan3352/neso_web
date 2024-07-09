import { IconButton, InputAdornment, TextField } from "@material-ui/core"
import { Visibility } from "@material-ui/icons"
import { useState } from "react"


const PasswordField = ({ onChange, value, errorText, className, newpassword}) => {

    const [visible, setVisible] = useState(false)

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const toggleVisibility = () => {
        setVisible(prev => !prev)
    }


    return (
        <TextField
            spellCheck={false}
            error={Boolean(errorText)}
            helperText={errorText}
            InputLabelProps={{ required: false }}
            label='Password'
            variant='outlined'
            type={visible ? 'text' : 'password'}
            value={value}
            onChange={onChange}
            required
            className={className}
            inputProps={newpassword && {
                autocomplete: 'new-password',
                form: {
                    autocomplete: 'off',
                },
            }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position='end'>
                        <IconButton
                            aria-label='toggle password visibility'
                            onClick={toggleVisibility}
                            onMouseDown={handleMouseDownPassword}
                            edge='end'>
                            <Visibility color={visible ? 'secondary' : 'default'} />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    )
}

export default PasswordField