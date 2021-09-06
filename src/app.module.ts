import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from './config';
import {
  NodemailerDrivers,
  NodemailerModule,
  NodemailerOptions,
} from '@crowdlinker/nestjs-mailer';
import { AuthModule } from './modules/auth/auth.module';
import { SalaryModule } from './modules/salary/salary.module';
import { ProfileModule } from './modules/profile/profile.module';
import { GroupsModule } from './modules/groups/groups.module';
import { PrivilegesModule } from './modules/privileges/privileges.module';
import { GroupsPrivilegesModule } from './modules/groups_privileges/groups_privileges.module';
import { PrivilegesCategoriesModule } from './modules/privileges_categories/privileges_categories.module';
import { BranchesModule } from './modules/branches/branches.module';
import { ProductsCategoriesModule } from './modules/products_categories/products_categories.module';
import { ProductsModule } from './modules/products/products.module';
import { FirebaseModule } from "nestjs-firebase";

@Module({
  imports: [
    TypeOrmModule.forRoot(config.db as TypeOrmModuleOptions),
    NodemailerModule.forRoot(
      config.nodeMailerOptions as NodemailerOptions<NodemailerDrivers.SMTP>,
    ),
    AuthModule,
    SalaryModule,
    ProfileModule,
    GroupsModule,
    PrivilegesModule,
    GroupsPrivilegesModule,
    PrivilegesCategoriesModule,
    BranchesModule,
    ProductsCategoriesModule,
    ProductsModule,
    FirebaseModule.forRoot({
      googleApplicationCredential: './storage-9c3d3-firebase-adminsdk-mzc4j-d8fea63203.json',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
