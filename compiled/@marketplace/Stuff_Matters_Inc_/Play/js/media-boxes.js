var dMasonry=document.getElementById("m_info_fields-media-boxes").getAttribute("data-masonry");if("true"==dMasonry){var grids=document.querySelectorAll(".play_grid-media-boxes");grids.forEach((function(grid){var msnry=new Masonry(grid,{itemSelector:".play_grid-item",columnWidth:".play_grid-sizer",gutter:".play_grid-gutter-sizer",percentPosition:!0});imagesLoaded(grid).on("progress",(function(){msnry.layout()}))}))}
//# sourceURL=https://cdn1.hubspotusercontent-eu1.net/hub/26937672/hub_generated/template_assets/61692185806/1676287497196/marketplace/Stuff_Matters_Inc_/Play/js/media-boxes.js