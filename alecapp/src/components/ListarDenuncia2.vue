<template v-slot:default>
  <v-container >
    <v-row>
      <v-col>
        <div class="text-center">
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
         <div>
    <v-data-table
      dark
      :headers="headers"
      :items="den"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      class="elevation-1"
      @page-count="pageCount = $event"
    ></v-data-table>
    <div class="text-center pt-2">
      <v-pagination
        v-model="page"
        :length="pageCount"
      ></v-pagination>
    </div>
  </div>
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
      axios.get('http://localhost/ApiCon/index.php?id_denuncia='+this.id)
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
      headers: [
        {
            text: 'Numero denuncia',
            align: 'start',
            sortable: false,
            value: 'numero',
        },
        { text: 'Persona denunciada', value: 'persona'},
        { text: 'Institucion perteneciente', value: 'institucion'},
        { text: 'Lugar correspondiente', value: 'lugar'},
        { text: 'Descripción', value: 'descripcion'}
      ],
      den: [],
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
            .get('http://localhost/ApiCon/index.php')
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
            .delete('http://localhost/ApiCon/index.php?id_denuncia='+ id)
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
           axios.post('http://localhost/ApiCon/index.php',formData)
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
        axios.put('http://localhost/ApiCon/index.php?id_denuncia='+this.id+
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
        },
        mounted(){
          axios.get('http://app-5725d857-ccbd-4694-bd03-6e82ecb660d6.cleverapps.io/')
          .then(response =>{
            this.denuncias = response.data;
            console.log(this.den);
          })
        }
        
    },
};
</script>
