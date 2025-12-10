"use strict";

import {SegmentTree} from "./ranges/segmenttree.js";
import Matter from "matter-js";

export const Rails = {
    name: "rails",
    version: "1.0.0",
    for: "matter-js@0.20.0",

    install: function(base) {
        base.after("Body.create", function() {
            Rails.Body.createRail(this);
        });

        base.before("Body.update", function() {
            Rails.Body.alignRailBody(this);
        });
    },

    Body: {
        createRail: function(body) {
            if(body.plugin.rails_granularity !== undefined) {
                let transverse_axis = Matter.Vector.create(1, 0);
                let slide_axis = Matter.Vector.create(0, 1);
                if(body.plugin.transverse_axis !== undefined) {
                    transverse_axis = body.plugin.transverse_axis;
                }
                if(body.plugin.slide_axis !== undefined) {
                    slide_axis = body.plugin.slide_axis;
                }
                body.plugin.centre_finder = new SegmentTree(this, this.rails_granularity, transverse_axis, slide_axis);
                body.plugin.old_center = Matter.Vector.rotate(body.plugin.centre_finder.centerOfMass(), body.angle);
            }
        },

        alignRailBody: function(body) {
            if(body.plugin.centre_finder !== undefined) {
                console.log("sigma");
            }
        }
    }
            


};

Matter.Plugin.register(Rails);