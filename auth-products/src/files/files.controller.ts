import { Controller, Patch, Param, UseInterceptors,
   UploadedFile, ParseUUIDPipe, Get, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { FilesService } from './files.service';
import { fileFilter } from './helpers/fileFilter.helper';
import { Response, Express } from 'express'
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { ApiFile } from './decorators/apiFile';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Patch('/:colection/:id')
  @ApiResponse({status: 200, description: 'Image updated'})
  @ApiResponse({status: 400, description: 'Bad request'})
  @ApiResponse({status: 404, description: 'Image link not found in DB'})
  @ApiResponse({status: 410, description: 'Data is inactive, it was deleted of DB'})
  @ApiBearerAuth('JWT-auth')
  @Auth()
  @ApiConsumes('multipart/form-data')
  @ApiFile()
  @UseInterceptors(FileInterceptor('file',{
    fileFilter: fileFilter, // Si viene un file. Reviso si el file es una imagen
  }))  
  uploadFile( 
    @Param('id', ParseUUIDPipe) id: string,   
    @Param('colection') colection: string, 
    @UploadedFile('file') file: Express.Multer.File,
    @GetUser()user: User
  ) {
    return this.filesService.updateImage(file, id, user, colection)
  }

  @Get('/:colection/:imageName')
  @ApiResponse({status: 201, description: 'Image updated', type: String})
  @ApiResponse({status: 404, description: 'Image link not found in DB'})
  findProductImage(
    @Res() res: Response, //Mostrar la iamgen, yo me encargo de la respuesta, no NEST
    @Param('imageName') imageName: string,
    @Param('colection') colection: string
  ){
    const path= this.filesService.getStaticImage(imageName, colection)
    res.sendFile(path);
  }

}