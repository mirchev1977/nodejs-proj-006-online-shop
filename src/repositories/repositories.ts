import User    from "./repositories-user";
import Login   from "./repositories-login";
import Product from "./repositories-product";
import Cart    from "./repositories-cart";

export default function createRelations(): void {
    Login.belongsTo( User, { constraints: true, onDelete: "CASCADE" } );
    User.hasMany( Login ); 

    Product.belongsTo( User, { constraints: true, onDelete: "CASCADE" } );
    User.hasMany( Product ); 

    Cart.belongsTo( User, { constraints: true, onDelete: "CASCADE" } );
    User.hasOne( Cart );
}