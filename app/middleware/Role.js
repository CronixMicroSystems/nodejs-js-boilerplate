module.exports = roles => {
  if (typeof roles === 'string') {
    roles = [roles]
  }

  return function* (next) {
    if (!this.state || !this.state.user || !roles || !roles.length || roles === '*' || roles[0] === '*') {
      return yield next
    }

    // const userRoles = this.state.user.roles || []
    const userRole = [this.state.user.role.value] || []
    const foundRoles = roles.filter(r => userRole.some(ur => ur === r))

    if (!foundRoles.length) {
      this.throw(403)
    }

    yield next
  }
}
