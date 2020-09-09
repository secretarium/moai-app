import { IsString } from 'class-validator';

class CreateNodeDto {
    @IsString()
    public address: string;
}

export default CreateNodeDto;
