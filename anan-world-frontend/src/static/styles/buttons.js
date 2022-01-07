import styled, {css} from "styled-components";
import {Button} from "antd";


export const CustomButton = styled(Button)`
    margin: ${props => props.margin || "0"};
    margin-left: ${props => props.marginx || "0"};
    margin-right: ${props => props.marginx || "0"};
    margin-top: ${props => props.marginy || "0"};
    margin-bottom: ${props => props.marginy || "0"};
    border-radius: ${props => props.radius || "5"};
    
      ${(props) =>
            props.width && css`
              width: ${props => props.width}
        `}
        
      ${(props) =>
             props.color && css`
                color: ${props => props.color}
        `}
`