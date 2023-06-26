import { AbilityBuilder, createMongoAbility } from "@casl/ability";
import { IUser, ICredential, IOrganization } from "./@types";

export default function defineAbilityForUser(user: IUser) {
    type Actions = 'create' | 'read' | 'update' | 'delete';
    type Subjects = 'Article' | 'Comment' | 'User' | IUser | ICredential | IOrganization;

    const { can, cannot } = new AbilityBuilder(createMongoAbility);
    if (user.role === "admin") {
        can("manage", "Credentials", { organizationId: user.organizationId });
        can("manage", "Users", { organizationId: user.organizationId });
    }
    else {
        can("read", "Organization").because("You're not an admin.");
        cannot("manage", "Credentials").because("You're not an admin.");
        cannot("delete", "Organization");
    }

    return createMongoAbility<[Actions, Subjects]>();;
}

