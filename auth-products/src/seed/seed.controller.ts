import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SeedService } from './seed.service';

@ApiTags('Seed')
@Controller('seed') 
@ApiResponse({status: 200, description: 'Seed Executed', type: String})
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  //@Auth(ValidRoles.admin) //Solo admin puede hacer un seed
  executeSeed() {
    return this.seedService.runSeed();
  }
}