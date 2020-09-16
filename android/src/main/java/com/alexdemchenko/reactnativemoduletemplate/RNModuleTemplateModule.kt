package com.alexdemchenko.reactnativemoduletemplate

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

class RNModuleTemplateModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "RNModuleTemplate"

    override fun getConstants(): MutableMap<String, Any> {
        return hashMapOf("count" to 1)
    }
}
