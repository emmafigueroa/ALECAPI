<template v-slot:default>
  <v-container >
    <v-row>
      <v-col>
        <div class="">
        <v-btn
          @click.stop="modelCrear = true"
          text
          color="primary"
          text-center
        >
        <v-icon >mdi-plus</v-icon> 
        </v-btn>  
        </div>     
    
               
      </v-col>
    </v-row>
    <v-row class="d-flex text-center">
      <v-col>
        <v-simple-table height="400px" dark fixed-header class="elevation-3" >
          <template v-slot:default>
              
            <thead>
              <tr>
                <th class="text-center">Id denuncia</th>
                <th class="text-center">Persona denunciada</th>
                <th class="text-center">Institución perteneciente</th>
                <th class="text-center">Lugar de los hechos</th>
                <th class="text-center">Descripción de los hechos</th>
                <th class="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="denuncia in denuncias" :key="denuncia.id_denuncia">
                <td>{{ denuncia.id_denuncia }}</td>
                <td>{{ denuncia.servidor_denunciado }}</td>
                <td>{{ denuncia.entidad_perteneciente }}</td>
                <td>{{ denuncia.lugar_echos }}</td>
                <td>{{ denuncia.descripcion_evento }}</td>
                <td>
                  <v-btn
                    @click.stop="modelEditar = true"
                    @click="id = denuncia.id_denuncia"
                    text
                    color="primary"
                    ><v-icon>mdi-pencil</v-icon></v-btn
                  >
                  <v-btn
                    @click.stop="modelEliminar = true"
                    @click="id = denuncia.id_denuncia"
                    text
                    color="error"
                    ><v-icon>mdi-delete</v-icon></v-btn
                  >
                </td>
              </tr>
            </tbody>
          </template>
          
        </v-simple-table>
      </v-col>
    </v-row>

            
    <!-- ventana de diálogo para eliminar registros -->
    <v-dialog v-model="modelEliminar" max-width="350" dark>   
      <v-card>
        <v-card-title
          >¿Desea eliminar el registro?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="modelEliminar = false" text>Cancelar</v-btn>
          <v-btn @click="confirmarBorrado(id)" text color="error" >Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="modelEditar" dark>   
      <v-card >
        <v-form ref="form" v-on:submit.prevent="editarDenuncia(id)">
            <v-text-field 
            v-model="denuncia.servidor_denunciado"
            label="Persona Denunciada"
            outlined
            required
          >{{denuncia.servidor_denunciado}}</v-text-field>

           <v-text-field
            v-model="denuncia.entidad_perteneciente"
            label="Intitución Perteneciente"
            outlined
            required
          ></v-text-field>

            <v-text-field
            v-model="denuncia.lugar_echos"
            label="Lugar de los hechos"
            outlined
            required
          ></v-text-field>

           <v-text-field
            v-model="denuncia.descripcion_evento"
            label="Descripcion del Evento"
            outlined
            required
          ></v-text-field>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="modelEditar = false" text>Cancelar</v-btn>
          <v-btn @click="reset" text color="error">Reiniciar</v-btn>
          <v-btn @click="editarDenuncia(id)" text color="primary"  type="submit">Modificar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        <v-dialog v-model="modelCrear" dark>   
      <v-card >
        <v-form ref="form" v-on:submit.prevent="guardarDenuncia()">
            <v-text-field 
            v-model="denuncia.servidor_denunciado"
            label="Persona Denunciada"
            outlined
            required
          ></v-text-field>

           <v-text-field
            v-model="denuncia.entidad_perteneciente"
            label="Intitución Perteneciente"
            outlined
            required
          ></v-text-field>

            <v-text-field
            v-model="denuncia.lugar_echos"
            label="Lugar de los hechos"
            outlined
            required
          ></v-text-field>

           <v-text-field
            v-model="denuncia.descripcion_evento"
            label="Descripcion del Evento"
            outlined
            required
          ></v-text-field>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="modelCrear = false" text>Cancelar</v-btn>
          <v-btn @click="reset" text color="error">Reiniciar</v-btn>
          <v-btn @click="guardarDenuncia()" text color="primary" type="submit">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- componente snackbar para mostrar mensaje de eliminación -->
    <v-snackbar v-model="snackbarEliminar" text color="error">
      {{ textsnackEliminar }}
      <template v-slot:action="{ attrsEliminar }">
        <v-btn text v-bind="attrsEliminar" @click="snackbarEliminar = false">Cerrar</v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbarEditar" text color="primary">
      {{ textsnackEditar }}
      <template v-slot:action="{ attrsEditar }">
        <v-btn text v-bind="attrsEditar" @click="snackbarEditar = false">Cerrar</v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbarCrear" text color="primary">
      {{ textsnackCrear }}
      <template v-slot:action="{ attrsCrear }">
        <v-btn text v-bind="attrsCrear" @click="snackbarCrear = false">Cerrar</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  name: 'listarDenuncias',
  mounted() {
    this.obtenerDenuncias();
      this.id = this.$route.params.id
      console.log(this.$route)
      axios.get('http://app-5725d857-ccbd-4694-bd03-6e82ecb660d6.cleverapps.io?id_denuncia='+this.id)
      .then(r =>{
        this.denuncia = r.data
      })
      .catch(function(error){
        console.log(error)
      })
  },
  data() {
    return {
      page: 1,
      pageCount:0,
      itemsPerPage:6,
      modelEliminar: false,
      modelEditar: false,
      modelCrear: false,
      denuncias: null,
      id_denuncia: null,
      snackbarEliminar: false,
      snackbarEditar: false,
      snackbarCrear: false,
      textsnackEliminar: "¡Registro Eliminado!",
      textsnackEditar: "¡Registro Editado!",
      textsnackCrear: "¡Registro Creado!",

      id: null,
            denuncia:{
                servidor_denunciado:'',
                entidad_perteneciente:'',
                lugar_echos:'',
                descripcion_evento:'' 
            }
    };
  },
  methods: {
        obtenerDenuncias() {
            axios
            .get('http://app-5725d857-ccbd-4694-bd03-6e82ecb660d6.cleverapps.io')
            .then((r) => {
            this.denuncias = r.data;
            console.log(this.denuncias);
            })
            .catch(function (error) {
            console.log(error);
            });
        },
        confirmarBorrado(id) {
            axios
            .delete('http://app-5725d857-ccbd-4694-bd03-6e82ecb660d6.cleverapps.io?id_denuncia='+ id)
            .then(() => {
            this.obtenerDenuncias();
            this.modelEliminar = false;
            this.snackbarEliminar = true;
            })
            .catch(function (error) {
            console.log(error);
            this.obtenerDenuncias();
            });
        },
        guardarDenuncia(){
           const formData = new FormData();
           
           formData.append('servidor_denunciado',this.denuncia.servidor_denunciado);
           formData.append('entidad_perteneciente',this.denuncia.entidad_perteneciente);
           formData.append('lugar_echos',this.denuncia.lugar_echos);
           formData.append('descripcion_evento',this.denuncia.descripcion_evento);
           axios.post('http://app-5725d857-ccbd-4694-bd03-6e82ecb660d6.cleverapps.io',formData)
           .then(()=>{
            this.modelCrear = false;
            this.snackbarCrear = true;
            this.obtenerDenuncias();
           })
           .catch(function(error){
            console.log(error);
            this.obtenerDenuncias();
            });
        },
        editarDenuncia(){
        axios.put('http://app-5725d857-ccbd-4694-bd03-6e82ecb660d6.cleverapps.io?id_denuncia='+this.id+
        '&servidor_denunciado='+this.denuncia.servidor_denunciado+
        '&entidad_perteneciente='+this.denuncia.entidad_perteneciente+
        '&lugar_echos='+this.denuncia.lugar_echos+
        '&descripcion_evento='+this.denuncia.descripcion_evento)
       
           .then(()=>{
            this.modelEditar = false;
            this.snackbarEditar = true;
            this.obtenerDenuncias();
           })
        .catch(function(error){
          console.log(error)
          this.obtenerDenuncias();
        })
        },
        reset(){
          this.$refs.form.reset()
          this.obtenerDenuncias();
        }
        
    },
};
</script>
