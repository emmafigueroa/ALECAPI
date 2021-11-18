<template>
    <v-container>
     <v-row class="text-center">    
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">Formulario de ALTA</h1>       
      </v-col>     
    </v-row>
    <v-row>
    <v-col>
        <form v-on:submit.prevent="guardarDenuncia()">

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
            label="Lugar de los Echos"
            outlined
            required
            ></v-text-field>

           <v-text-field
            v-model="denuncia.descripcion_evento"
            label="Descripcion del Evento"
            outlined
            required
            ></v-text-field>
            <v-card-actions>
                <v-btn color="warning" class="mr-4" type="submit">Guardar</v-btn>      
            </v-card-actions>
        </form>
    </v-col>
    </v-row>

    </v-container>
</template>
<script>
import axios from 'axios';
export default {
    name:'crearDenuncia',
    data(){
        return{
            id: null,
            denuncia:{
                servidor_denunciado:'',
                entidad_perteneciente:'',
                lugar_echos:'',
                descripcion_evento:'' 
            }
        };
    },
    methods:{
        guardarDenuncia(){
           var router = this.$router;
           const formData = new FormData();
           
           formData.append('servidor_denunciado',this.denuncia.servidor_denunciado);
           formData.append('entidad_perteneciente',this.denuncia.entidad_perteneciente);
           formData.append('lugar_echos',this.denuncia.lugar_echos);
           formData.append('descripcion_evento',this.denuncia.descripcion_evento);
           axios.post('http://localhost/ApiCon/index.php',formData)
           .then(()=>{
               router.push('/denuncias');
           })
           .catch(function(error){
        console.log(error);
            });
        }
    }
}
</script>