import {
  HeaderContainer,
  Header,
  HeaderName,
} from '@carbon/react';

const IBMHeader = () => {
  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <Header aria-label="Carbon React Template">
          <HeaderName href="#" prefix="IBM">
            Carbon React Template
          </HeaderName>
        </Header>
      )}
    />
  );
};

export default IBMHeader;