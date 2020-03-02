import rules from "./config/rbac-rules";

const check = (rules, role, action, data) => {
  console.debug('checking permissions!');
  const permissions = rules[role];
  if (!permissions) {
    console.debug(`permission denied - role ${role} does not exist`);
    return false;
  }

  const staticPermissions = permissions.static;

  if (staticPermissions && staticPermissions.includes(action)) {
    console.debug(`permission granted for ${role} to do ${action}`);
    return true;
  }

  const dynamicPermissions = permissions.dynamic;

  if (dynamicPermissions) {
    const permissionCondition = dynamicPermissions[action];
    if (!permissionCondition) {
      console.debug(`permission denied for ${role} to do ${action}`);
      return false;
    }

    return permissionCondition(data);
  }
  console.debug(`permission denied for ${role} to do ${action}`);
  return false;
};

const Can = props =>
  check(rules, props.role, props.perform, props.data)
    ? props.yes()
    : props.no();

Can.defaultProps = {
  yes: () => null,
  no: () => null
};

export default Can;
