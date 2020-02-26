"use strict";

use(function() {

    const XF_CONTENT_PATH = '/jcr:content/root';

    var backgroundImage, backgroundVideo;

    var paths = properties.get('paths', java.lang.reflect.Array.newInstance(java.lang.String, 0));
    var validatedPaths = [];

    for(var i in paths) {
        var path = paths[i];
        var res  = resolver.getResource(path);

        if(res == null) {
            validatedPaths.push('invalid');
            continue;
        }

        var xfPage = res.adaptTo(com.day.cq.wcm.api.Page);

        if(xfPage == null) {
            validatedPaths.push('invalid');
            continue;
        }

        var experienceFragment = xfPage.adaptTo(com.adobe.cq.xf.ExperienceFragment);
        var variation          = xfPage.adaptTo(com.adobe.cq.xf.ExperienceFragmentVariation);

        // if current path is neither xf nor variation, skip it
        if(experienceFragment == undefined && variation == undefined) {
            validatedPaths.push('invalid');
            continue;
        }

        // if current path is an xf, choose its first web variation
        if(experienceFragment != null) {
            var variations = experienceFragment.getVariations('web');

            if(variations.size() == 0) {
                validatedPaths.push('noVariations');
                continue;
            } else {
                variation = variations.get(0);
            }
        }

        validatedPaths.push(variation.getPath() + XF_CONTENT_PATH);
    }

    var imageResource = resource.getChild('image');
    if(imageResource != null) {
        backgroundImage = imageResource.adaptTo(Packages.org.apache.sling.api.resource.ValueMap).get('fileReference');
    }

    var videoResource = resource.getChild('video');
    if(videoResource != null) {
        backgroundVideo = videoResource.adaptTo(Packages.org.apache.sling.api.resource.ValueMap).get('fileReference');
    }

    return {
        paths: validatedPaths,
        backgroundImage: backgroundImage,
        backgroundVideo: backgroundVideo
    }
});
