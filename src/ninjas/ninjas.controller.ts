import { Controller, Get, Param, Query, Post, Body, Put, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { ValidationPipe } from '@nestjs/common';
import { BeltGuard } from 'src/belt/belt.guard';
@Controller('ninjas')
export class NinjasController {
    constructor(private readonly ninjasService: NinjasService){}

    @Get()
    getNinjas(@Query('weapon') weapon: 'stars'| 'nunchucks'){
        //const service = new NinjasService();
        return this.ninjasService.getNinjas(weapon)
    }
    @Get(':id')
    getOneNinja(@Param('id') id: string){ 
        try{
            return this.ninjasService.getNinja(+id);
        }
        catch (err){
            throw new NotFoundException("ninja not found");
        }
        
    }
    @Post()
    @UseGuards(BeltGuard)
    createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto){
        return this.ninjasService.createNinja(createNinjaDto);
    }
    @Put(':id')
    updateNinja(@Param('id') id:string, @Body() updateNinjaDto: UpdateNinjaDto){
        return this.ninjasService.updateNinja(+id, updateNinjaDto);
    }
    @Delete(':id')
    removeNinja(@Param('id') id: string){
        return this.ninjasService.removeNinja(+id)
    }

}
