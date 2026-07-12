import { NavItem } from "@ui/components/navigation/nav-item/NavItem";

export function InputsContent() {
  return (
    <>
      <NavItem label="Button" to="/settings/info/ui/components/inputs/button" />
      <NavItem label="Input Wrapper" to="/settings/info/ui/components/inputs/input-wrapper" />
      <NavItem label="Date Time" to="/settings/info/ui/components/inputs/date-time" />
      <NavItem label="Email" to="/settings/info/ui/components/inputs/email" />
      <NavItem label="File" to="/settings/info/ui/components/inputs/file" />
      <NavItem label="Number" to="/settings/info/ui/components/inputs/number" />
      <NavItem label="OTP" to="/settings/info/ui/components/inputs/otp" />
      <NavItem label="Password" to="/settings/info/ui/components/inputs/password" />
      <NavItem label="Search" to="/settings/info/ui/components/inputs/search" />
      <NavItem label="Modal Select" to="/settings/info/ui/components/inputs/modal-select" />
      <NavItem
        label="Modal Multi Select"
        to="/settings/info/ui/components/inputs/modal-multi-select"
      />
      <NavItem label="Select" to="/settings/info/ui/components/inputs/select" />
      <NavItem label="Text" to="/settings/info/ui/components/inputs/text" />
      <NavItem label="Toggle" to="/settings/info/ui/components/inputs/toggle" />
    </>
  );
}
