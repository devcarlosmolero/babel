function fromD1UserToAuthUser(user: any) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
    }
}

const Mappers = {
    fromD1UserToAuthUser,
}

export default Mappers
