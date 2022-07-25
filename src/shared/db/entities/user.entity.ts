import { Roles } from "../../enums/roles.enum";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from "typeorm";

@Entity()
@Tree("materialized-path")
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    nullable: false
  })
  email: string;

  @Column({
    nullable: false
  })
  password: string;

  @Column({
    nullable: false,
    default: Roles.SimpleUser
  })
  role: Roles

  @TreeChildren()
  user: UserEntity[]

  @TreeParent()
  boss: UserEntity
}