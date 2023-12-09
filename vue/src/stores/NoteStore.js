import {defineStore} from "pinia";
import axios from "axios";

export const useNoteStore = defineStore('NoteStore',  {
    state: () =>(
        {
            notes: [],
            body: '',

        }),



})