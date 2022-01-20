import Database from "./main";
import { Utils as t_Utils } from '../types'
import Currency from "../game/types";
import Keyv from "@keyvhq/core";

const players_db = new Database('players');

interface Utils extends t_Utils {};

class Utils {
    constructor(keyv: Keyv) {
        this.keyv = keyv;
    }
    async get(id) {
        let value = await this.keyv.get(id);
        if (!value) {
            value = {
                id, 
                balance: {
                    coins: 0
                }
            }
        }
    }
}

players_db.utils = new Utils(players_db.keyv)