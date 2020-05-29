import * as React from "react";
import styled from 'styled-components';
import { useEffect, useRef } from 'react';

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  & > .modal-content {
    padding: 1.5rem 2rem;
    background-color: white;
    border-radius: 5px;
    width: calc(100% - 4rem);
    position: relative;

    .close-button {
      position: absolute;
      top: 0;
      right: 0;
      background-color: var(--color-paleteal);
      border-top-right-radius: 5px;
      height: 3.2rem;
      width: 3.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      img {
        height: 1.6rem;
        width: 1.6rem;
      }
    }

    @media screen and (min-width: 760px) {
      width: auto;
    }
  }
`
interface Props {
    open: boolean,
    children: any,
    // closeOnClickOutside: boolean,
     onClose: any,
    // showCloseButton: boolean
    // ref?:any

}
 const Modal: React.FunctionComponent<Props> = (props) => {
     
    const enhanchedChildren = React.Children.map(props.children, child =>
        
         React.cloneElement(child,
            props.onClose
            )
      )
    
    const refs = useRef(null) 

     useEffect(() => {
         
      if(props.open) document.body.style.overflow = 'hidden'
        return () => {
          document.body.style.overflow = 'auto'
        }
      }, [props.open])
    
   
        return props.open? (
            <StyledModal onClick={e => e.stopPropagation()}>
            <div ref={refs} className="modal-content">
              {enhanchedChildren}
              {/* {showCloseButton && (
              //   <div onClick={onClose} className="close-button">
              //     <img src={cross} alt="cross" />
              //   </div>
              )} */}
            </div>
          </StyledModal>
        ): null
    
}
export default Modal
