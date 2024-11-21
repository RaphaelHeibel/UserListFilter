import { Pipe, PipeTransform } from '@angular/core';
import { IAddress } from '../interfaces/user/address.interface';

@Pipe({
  name: 'adress'
})
export class AdressPipe implements PipeTransform {
  transform(adress: IAddress): unknown {
    const INVALID_ADDRESS =
      !adress ||
      !adress.rua ||
      !adress.cidade ||
      !adress.estado ||
      adress.numero === null ||
      adress === undefined;

    if (INVALID_ADDRESS)
      return 'Endereço indisponível ou inválido';

    return `${adress.rua}, ${adress.numero}, ${adress.cidade} - ${adress.estado}`;
  }
}
