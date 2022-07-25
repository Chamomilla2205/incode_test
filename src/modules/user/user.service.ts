import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/shared/db/entities/user.entity";
import { Repository } from "typeorm";
import { AppDataSource } from "src/data-source";
import { UserUpdateDto } from "./dto/user-update.dto";
import { Request } from "express";
import { JwtPayloadDto } from "../auth/dto/jwt-payload.dto";
import { Roles } from "src/shared/enums/roles.enum";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async getUserWithChilds(userInfo) {
    const user = await this.userRepository.findOne({ where: { id: userInfo.id }})
    
    return AppDataSource.manager.getTreeRepository(UserEntity).findDescendantsTree(user);
  }

  async updateUser(logedUser: JwtPayloadDto, newBossInfo: UserUpdateDto): Promise<UserEntity[]> {
    const bossRequestor = await this.userRepository.findOne({ where: { id: logedUser.id }}); // logged main boss
    
    if(!bossRequestor) {
      throw new Error('You were fired!');
    }

    const mainBossTree = await AppDataSource.manager
                                    .getTreeRepository(UserEntity)
                                    .findDescendantsTree(bossRequestor); // main boss info + his employees
    
    const newBoss = mainBossTree.user.find(user => user.id === newBossInfo.newBossId);

    if(!newBoss) {
      throw new Error('This member doesnt exist')
    }
    
    const employeeForNewBoss = mainBossTree.user.find(user => user.id === newBossInfo.userId);
    
    if(!employeeForNewBoss) {
      throw new Error('This member doesnt exist')
    }

    try {

      employeeForNewBoss.boss = newBoss;
      newBoss.user.push(employeeForNewBoss)
      
      newBoss.role = Roles.Boss;
      newBoss.boss = bossRequestor;   

      return this.userRepository.save([newBoss, employeeForNewBoss])
    } catch (err) {
      throw new Error(err.message)
    }
    
  }
}