export class Usuario {
  id:              number;
  conocimientos:   Conocimiento[];
  estudios:        Estudio[];
  experiencias:    Experiencia[];
  username:        string;
  password:        string;
  enabled:         boolean;
  fechaRegistro:   Date;
  roles:           Role[];
  primerNombre:    string;
  segundoNombre:   string;
  primerApellido:  string;
  segundoApellido: string;
  telefono:        string;
  email:           string;
  run:             string;
  estadoCivil:     string;
  imagen:          string;
  nacionalidad:    string;
  fechaNacimiento: Date;
  presentacion:    string;
  ciudad:          string;
  calle:           string;
  numero:          number;
}

export class Conocimiento {
  id:             number;
  descripcion:    string;
  autoevaluacion: number;
}

export class Estudio {
  id:           number;
  titulo:       string;
  lugar:        string;
  tipo:         string;
  fechaInicio:  Date;
  fechaTermino: Date;
}

export class Experiencia {
  id:           number;
  descripcion:  string;
  lugar:        string;
  fechaInicio:  Date;
  fechaTermino: Date;
}

export class Role {
  id:        number;
  authority: string;
}
