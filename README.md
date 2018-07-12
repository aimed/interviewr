# 📤 Interviewr
A tool to simplify creating resumes. To create a resume, simply place a ```resume-title.yaml``` file inside of the ```server/data``` directory or host it on dropbox and provide an API key.
The *yaml* file should correspond to the given graphql schema that can be inspected at ```/playground```.

---

Architecture:
```
┌────────────────┐
│    Dropbox     │
└────────────────┘
         │        
     YAML CV      
         │        
         ▼        
┌────────────────┐
│ GraphQL-Server │
└────────────────┘
         │        
    GraphQL CV    
         │        
         ▼        
┌────────────────┐
│  React/Apollo  │
└────────────────┘
```

The CV for an application is stored using a ```YAML``` file on dropbox. The yaml files are easily readable and modifyable and thus prevent the need for interfaces. Hosting the file on dropbox makes it accessible to the server and solves authentication.

Each CV can be accessed using an access code. The access code corresponds to the file hosted on dropbox. To prevent enumerating/guessing access codes, a random string **should** be appended to the CVs file name. E.g.: the access code ```norocketlab-nfjK5``` will read the file ```norocketlab-nfjK5.yaml``` in the dropbox application folder. For this purpose a dropbox API key has to be generated beforehand.
