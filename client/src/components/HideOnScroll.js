import React from 'react';
import { useScrollTrigger, Slide } from '@material-ui/core';

const HideOnScroll = ({ children }) => {
  // useScrollTrigger hook from Material-UI to determine if the user has scrolled
  const trigger = useScrollTrigger();

  // Slide component from Material-UI is used to animate the hiding and showing of the children
  // The children are wrapped inside the Slide component
  // The 'appear' prop is set to 'false' to prevent the slide animation on initial render
  // The 'direction' prop is set to 'up' to slide the children up when hiding
  // The 'in' prop is set to the opposite of the 'trigger' value, so the children are shown when 'trigger' is false and hidden when 'trigger' is true
  return (
    <Slide appear={false} direction="up" in={!trigger}>
      {children}
    </Slide>
  );
};

export default HideOnScroll;
