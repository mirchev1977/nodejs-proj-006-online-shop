import User  from "./repositories-user";
import Login from "./repositories-login";

export default function createRelations(): void {
    Login.belongsTo( User, { constraints: true, onDelete: "CASCADE" } );
    User.hasMany( Login ); 
}