export class Persona {
  id:              number;
  conocimientos:   Conocimiento[];
  estudios:        Estudio[];
  experiencias:    Experiencia[];
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
  tecnologia:     Tecnologia;
  autoevaluacion: number;
}

export class Tecnologia {
  id:       number;
  nombre:   string;
  lenguaje: string;
  tipo:     string;
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
